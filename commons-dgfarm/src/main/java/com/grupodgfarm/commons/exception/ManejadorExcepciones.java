/**
 * 
 */
package com.grupodgfarm.commons.exception;

import java.rmi.RemoteException;
import java.sql.SQLException;
import java.util.Arrays;





/**
 * <p>
 * Clase utilitaria para manejo de excepciones.
 * </p>
 * 
 * @author <a href="mailto:geormancalderon@digifarm.com">Georman Calderon</a>
 * @version 2.0
 */
public class ManejadorExcepciones {
	
	/**
	 * String literal <code>Error ORA</code>.
	 */
	private static final String ERROR_ORA = "ORA-";

	/**
	 * String literal <code>Codigo ORA</code>.
	 */
	private static final int CODIGO_ORA = 20000;

	/**
	 * Codigos para cuando la plataforma no se encuentra disponible.
	 */
	private static final int PLATAFORMA_NO_DISPONIBLE_ORA_CODIGOS[] = {1033,
			1089, 12505, 12518, 12519, 12528, 12541, 17002};
	
	private static final String GENERIC_ERROR_MESSAGE="Error Operacional";

	/**
	 * Constructor sin argumentos.
	 */
	private ManejadorExcepciones() {

	}
	
	/**
	 * <p>
	 * Convierte una excepci&oacute;n (Ej. SQLException, RemoteException) a una
	 * excepci&oacute;n basada en <code>SegurosCaracasException</code>.
	 * </p>
	 * 
	 * @param aplicacion
	 *            <code>String</code> nombre de la aplicaci&oacute;n
	 * @param origen
	 *            <code>String</code> nombre de la clase con su m&eacute;todo o
	 *            paquete PL/SQL que gener&oacute; la excepci&oacute;n
	 * @param transaccion
	 *            <code>String</code> identificador de la transacci&oacute;n.
	 * @param plataforma
	 *            <code>String</code> nombre de la plataforma sobre el cual se
	 *            apoya la aplicaci&oacute;n para dar respuesta.
	 * @param paramEntrada
	 *            <code>String</code> par&aacute;metros de entrada usados para
	 *            invocar el(los) componente(s) que dan respuesta a la
	 *            solicitud.
	 * @param e
	 *            <code>Throwable</code> excepci&oacute;n original
	 * @return excepci&oacute;n de tipo <code>SegurosCaracasException</code>
	 */
	public static DgFarmException manejar(final String aplicacion,
			final String origen, final String transaccion,
			final String plataforma, final String paramEntrada,
			final Throwable e) {
		if (e instanceof DgFarmException) {
			return (ManejadorExcepciones.manejarBanescoSegurosException(
					aplicacion, origen, transaccion, plataforma, paramEntrada,
					(DgFarmException) e));
		} else if (e instanceof SQLException) {
			return (ManejadorExcepciones.manejarSQLException(aplicacion,
					origen, transaccion, plataforma, paramEntrada,
					(SQLException) e));
		} else if (e instanceof BusinessException) {
			return (ManejadorExcepciones.manejarBusinessException(aplicacion,
					origen, transaccion, plataforma, paramEntrada,
					(BusinessException) e));			
		}else if (e instanceof RemoteException) {
			return (ManejadorExcepciones.manejarRemoteException(aplicacion,
					origen, transaccion, plataforma, paramEntrada,
					(RemoteException) e));
		} else if (e != null) {
			return (new NotHandledException(aplicacion, origen,
					-1, e.getMessage(), transaccion,
					plataforma, paramEntrada, e));
		} else {
			return (new NotHandledException(aplicacion, origen,
					-1,GENERIC_ERROR_MESSAGE,
					transaccion, plataforma, paramEntrada, null));
		}
	}
	
	
	/**
	 * <p>
	 * Transforma una excepci&oacute;n de tipo <code>RemoteException</code>, a
	 * una excepci&oacute;n de tipo <code>SegurosCaracasException</code>.
	 * </p>
	 * 
	 * @param aplicacion
	 *            <code>String</code> nombre de la aplicaci&oacute;n
	 * @param origen
	 *            <code>String</code> nombre de la clase con su m&eacute;todo o
	 *            paquete PL/SQL que gener&oacute; la excepci&oacute;n
	 * @param transaccion
	 *            <code>String</code> identificador de la transacci&oacute;n.
	 * @param plataforma
	 *            <code>String</code> nombre de la plataforma sobre el cual se
	 *            apoya la aplicaci&oacute;n para dar respuesta.
	 * @param paramEntrada
	 *            <code>String</code> par&aacute;metros de entrada usados para
	 *            invocar el(los) componente(s) que dan respuesta a la
	 *            solicitud.
	 * @param e
	 *            <code>RemoteException</code> excepci&oacute;n a transformar
	 * @return excepción de tipo <code>SegurosCaracasException</code>
	 */
	private static DgFarmException manejarRemoteException(
			final String aplicacion, final String origen,
			final String transaccion, final String plataforma,
			final String paramEntrada, final RemoteException e) {
		if ((e.detail != null)
				&& (e.detail.getClass().getName()
						.equals("oracle.j2ee.ws.client.ClientTransportException"))) {
			return (new PlataformaNoDisponibleException(aplicacion, origen,
					-1, e.getMessage(), transaccion,
					plataforma, paramEntrada, e));
		} else {
			return (new NotHandledException(aplicacion, origen,
					-1, e.getMessage(), transaccion,
					plataforma, paramEntrada, e));
		}
	}



	private static DgFarmException manejarBusinessException(
			String aplicacion, String origen, String transaccion,
			String plataforma, String paramEntrada,
			BusinessException e) {
		// TODO Auto-generated method stub
		return null;
	}

	private static DgFarmException manejarSQLException(
			String aplicacion, String origen, String transaccion,
			String plataforma, String paramEntrada, SQLException e) {
		int codigo = e.getErrorCode();
		String mensaje = e.getMessage();

		if (codigo == 0) {
			int index = mensaje.indexOf(ManejadorExcepciones.ERROR_ORA);
			try {
				codigo = Integer.parseInt(mensaje.substring(index + 4,
						index + 9));
			} catch (Exception e2) {
				return (new NotHandledException(aplicacion, origen,
						-1, mensaje, transaccion,plataforma,paramEntrada,(Exception)e));
			}
		}
		if (Arrays.binarySearch(
				ManejadorExcepciones.PLATAFORMA_NO_DISPONIBLE_ORA_CODIGOS,
				codigo) >= 0) {
			return (new PlataformaNoDisponibleException(aplicacion, origen,
					codigo, mensaje, transaccion, plataforma,
					paramEntrada, e));

		} else if (codigo == ManejadorExcepciones.CODIGO_ORA) {
			return (new HandledException(aplicacion, origen,
					1, mensaje, transaccion,plataforma,paramEntrada,e));
		} else {
			return (new NotHandledException(aplicacion, origen,
					-1, mensaje, transaccion,
					plataforma, paramEntrada, e));
		}
	}
	
	/**
	 * <p>
	 * Agrega a una excepci&oacute;n de tipo
	 * <code>BanescoSegurosException</code>, mas informaci&oacute;n.
	 * </p>
	 * 
	 * @param aplicacion
	 *            <code>String</code> nombre de la aplicaci&oacute;n
	 * @param origen
	 *            <code>String</code> nombre de la clase con su m&eacute;todo o
	 *            paquete PL/SQL que gener&oacute; la excepci&oacute;n
	 * @param codigo
	 *            <code>int</code> c&oacute;digo de error asociado a la
	 *            excepci&oacute;n.
	 * @param mensaje
	 *            <code>String</code> mensaje de error asociado a la
	 *            excepci&oacute;n.
	 * @param transaccion
	 *            <code>String</code> identificador de la transacci&oacute;n.
	 * @param plataforma
	 *            <code>String</code> nombre de la plataforma sobre el cual se
	 *            apoya la aplicaci&oacute;n para dar respuesta.
	 * @param paramEntrada
	 *            <code>String</code> par&aacute;metros de entrada usados para
	 *            invocar el(los) componente(s) que dan respuesta a la
	 *            solicitud.
	 * @param e
	 *            <code>BanescoSegurosException</code> excepci&oacute;n sobre la
	 *            cual se agregara informaci&oacute;n.
	 * @return excepción de tipo <code>BanescoSegurosException</code>
	 */

	private static DgFarmException manejarBanescoSegurosException(
			String aplicacion, String origen, String transaccion,
			String plataforma, String paramEntrada, DgFarmException e) {
		
		if (e.getAplicacion() == null) {
			e.setAplicacion(aplicacion);
		}
		if (e.getOrigen() == null) {
			e.setOrigen(origen);
		}
		if (e.getTransaccion() == null) {
			e.setTransaccion(transaccion);
		}
		if (e.getPlataforma() == null) {
			e.setPlataforma(plataforma);
		}
		if (e.getParamEntrada() == null) {
			e.setParamEntrada(paramEntrada);
		}
		return (e);
	}

//	public static BanescoSegurosException manejar(String aplicacion,
//			String origen, String transaccion, String platformTrace,
//			String string, Exception e) {
//		// TODO Auto-generated method stub
//		return null;
//	}


}
