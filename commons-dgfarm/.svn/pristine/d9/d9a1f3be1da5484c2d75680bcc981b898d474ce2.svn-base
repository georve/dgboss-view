package com.grupodgfarm.commons.persistence.dao;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Map;
import java.util.Properties;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;

import com.grupodgfarm.commons.exception.DgFarmException;
import com.grupodgfarm.commons.exception.HandledException;
import com.grupodgfarm.commons.exception.ManejadorExcepciones;
import com.grupodgfarm.commons.exception.NotHandledException;

public abstract class CommonsDao {
	
	
	/**
	 * Patr&oacute;n que describe el formato de la fecha y hora usada para
	 * escribir los par&aacute;metros de tipo
	 * <code>java.util.Date, java.sql.Date y java.util.Calendar</code> en el log
	 * de la aplicaci&oacute;n. El valor por defecto es el siguiente:
	 * <code>dd/MM/yy hh:mm:ss</code>
	 */
	private String patternDate = "dd/MM/yy hh:mm:ss";

	
	/**
	 * String literal <code>PARAMETERS_IN</code>.
	 */
	private static final String PARAMETERS_IN = "Parameters In: ";
	
	
    private static final String PARAMETERS_OUT="Parameters Out: ";
	/**
	 * String literal <code>OPEN_BRACKET</code>.
	 */
	private static final String OPEN_BRACKET = "(";

	/**
	 * String literal <code>CLOSE_BRACKET</code>.
	 */
	private static final String CLOSE_BRACKET = ")";

	
	private static final String ERROR_MSG = "Una excepcion se ha generado en la aplicacion";

	private Properties applicationProperties;
	
	public void writeParams(Map<String, Object> params, Logger logger){
		
		logger.info(params);
		
	}
	

		
	public DgFarmException handleException(Exception e, Logger logger, String transactionId){
		
		if(e instanceof HandledException){
			return (HandledException)e;
		}
		else if(e instanceof NotHandledException){
			return (NotHandledException)e;
		}
		
		StringBuffer message = new StringBuffer();
		message.append("Disculpe en este momento no es posible realizar esta operación. (");
		message.append(transactionId);
		message.append(")");
		NotHandledException notHandledException = new NotHandledException(message.toString());
		
		if(transactionId!=null ){
			logger.error(transactionId, e);
		}else{
			logger.error(e);
		}
		
		
		return notHandledException;
		
	}
	
	/**
	 * metodo que define cuando una excepcion es considerada controlada o no. El parametro que indica si la excepción
	 * es controlada es el codigo de error que se genera como respuesta luego de hacer la invocacion de un PL/SQL
	 * @param outParams parametros que genera como respuesta la llamada del PL/SQL
	 * @param logger el objeto logger
	 * @throws DgFarmException 
	 */
	
	public void handleOutParameterCode(Map<String, Object> outParams, Logger logger) throws DgFarmException {
		if(outParams.containsKey("CD_ERROR") && outParams.get("CD_ERROR") != null){
			if(Integer.parseInt(String.valueOf(outParams.get("CD_ERROR")))>0){
				throw new HandledException(String.valueOf(outParams.get("DE_ERROR")));
			}
			if(Integer.parseInt(String.valueOf(outParams.get("CD_ERROR")))<0){
				throw new NotHandledException(String.valueOf(outParams.get("DE_ERROR")));
			}
		}
	}
	
	
	/**
	 * <p>
	 * funcion que hace la escritura en el log de la aplicacion del valor retornado por la funcion
	 * PL/SQL luego de haber hecho la evaluacion
	 * 
	 * </p>
	  * 
	 * Los argumentos <code>String...</code> deben ser enviados en el siguiente
	 * orden: transaccion, aplicacion, origen, metodo, plataforma, dataSource,
	 * procedure.
	 * 
	 * @param params
	 *            <code>Object;</code> objeto a ser escrito en el log
	 *            usados para invocar el stored procedure.
	 * @param logger
	 *            <code>Logger</code> logger de la aplicaci&oacute;n.
	 * @param args
	 *            <code>String...</code> argumentos adicionales para su
	 *            escritura en el log de la aplicaci&oacute;n.
	 */
	public void writeOutParamTraceFunction(Object params,
			Logger logger, String... args) {
		String transaccion = args[0];
		String aplicacion = args[1];
		String origen = args[2];
		String metodo = args[3];
		String plataforma = args[4];
		String dataSource = args[5];
		String procedure = args[6];
		String codigo = args[7];
		String descripcion = args[8];
		String time = args[9];
		StringBuffer inParams = new StringBuffer(CommonsDao.PARAMETERS_OUT);
		inParams.append(codigo).append(",").append(descripcion);

		if (logger.isEnabledFor(Level.INFO)) {
			logger.log(Level.INFO,Arrays.toString( new String[] {transaccion,
					aplicacion, origen, metodo, plataforma, dataSource,
					procedure, inParams.toString(),time}));
		}
	}
	
	
	/**
	 * <p>
	 * Transforma un <code>Object</code> en un
	 * <code>String</code>.
	 * </p>
	 * 
.
	 * 
	 * @param params
	 *            <code>Object</code> par&aacute;metros.
	 * @return <code>String</code> con la informacion.
	 */
	
	private String transformObjectString(Object params) {
		StringBuffer result = new StringBuffer();
		DateFormat formatter = null;
		Object value = null;
		if (params != null) {
			if (params instanceof java.sql.Date) {
				formatter = new SimpleDateFormat(this.getPatternDate());
				value = formatter.format((java.sql.Date) params);
			} else if (params instanceof java.util.Date) {
				formatter = new SimpleDateFormat(this.getPatternDate());
				value = formatter.format((java.util.Date) params);
			} else if (params instanceof java.util.Calendar) {
				formatter = new SimpleDateFormat(this.getPatternDate());
				value = formatter.format(((java.util.Calendar) params)
						.getTimeInMillis());
			} else if (params instanceof java.util.Collection) {
				value = ((java.util.Collection) params).size()
						+ " registros";
			} else {

				value = params;
			}
		} else {
			value = "null";
		}
		result.append("value").append("=").append(value.toString());

		if (params != null) {
			result.append(CommonsDao.OPEN_BRACKET).append(params.getClass().getSimpleName())
					.append(CommonsDao.CLOSE_BRACKET);
		} else {
			result.append(CommonsDao.OPEN_BRACKET).append("null").append(CommonsDao.CLOSE_BRACKET);
		}
        
		return result.toString();
		
		
	}



	/**
	 * <p>
	 * Realiza la escritura del stored procedure, los par&aacute;metros de
	 * entrada y una serie de informaci&oacute;n en el log de la
	 * aplicaci&oacute;n.
	 * </p>
	 * 
	 * Los argumentos <code>String...</code> deben ser enviados en el siguiente
	 * orden: transaccion, aplicacion, origen, metodo, plataforma, dataSource,
	 * procedure.
	 * 
	 * @param params
	 *            <code>Map&lt;String, Object&gt;</code> par&aacute;metros
	 *            usados para invocar el stored procedure.
	 * @param logger
	 *            <code>Logger</code> logger de la aplicaci&oacute;n.
	 * @param args
	 *            <code>String...</code> argumentos adicionales para su
	 *            escritura en el log de la aplicaci&oacute;n.
	 */
	
	public void writeOutParamTrace(Map<String, Object> params,
			Logger logger, String... args) {
		String transaccion = args[0];
		String aplicacion = args[1];
		String origen = args[2];
		String metodo = args[3];
		String plataforma = args[4];
		String dataSource = args[5];
		String procedure = args[6];
		String codigo = args[7];
		String descripcion = args[8];
		String time = args[9];
		StringBuffer inParams = new StringBuffer(CommonsDao.PARAMETERS_OUT);
		inParams.append(codigo).append(",").append(descripcion);


		if (logger.isEnabledFor(Level.INFO)) {
			logger.log(Level.INFO, Arrays.toString(new String[] {transaccion,
					aplicacion, origen, metodo, plataforma, dataSource,
					procedure, inParams.toString(),time}));
		}
		
	}
	
	/**
	 * <p>
	 * Transforma un <code>Map&lt;String, Object&gt;</code> en un
	 * <code>String</code>.
	 * </p>
	 * 
	 * Por lo general es usado para obtener la lista de parametros enviado a un
	 * stored procedure en el siguiente formato:
	 * param1=value1|param2=value2|param3=value3|...
	 * 
	 * @param params
	 *            <code>Map&lt;String, Object&gt;</code> par&aacute;metros.
	 * @return <code>String</code> con la informacion.
	 */
	public String transformMaptoString(final Map<String, Object> params) {
		StringBuffer result = new StringBuffer();
		DateFormat formatter = null;

		String key = null;
		Object obj = null;
		Object value = null;

		if (params != null) {
			for (Map.Entry<String, Object> entry : params.entrySet()) {
				key = entry.getKey();
				obj = entry.getValue();
				if (obj != null) {
					if (obj instanceof java.sql.Date) {
						formatter = new SimpleDateFormat(this.getPatternDate());
						value = formatter.format((java.sql.Date) obj);
					} else if (obj instanceof java.util.Date) {
						formatter = new SimpleDateFormat(this.getPatternDate());
						value = formatter.format((java.util.Date) obj);
					} else if (obj instanceof java.util.Calendar) {
						formatter = new SimpleDateFormat(this.getPatternDate());
						value = formatter.format(((java.util.Calendar) obj)
								.getTimeInMillis());
					} else {
						value = entry.getValue();
					}
				} else {
					value = "null";
				}
				result.append(key).append("=").append(value.toString());

				if (obj != null) {
					result.append(CommonsDao.OPEN_BRACKET).append(obj.getClass().getSimpleName())
							.append(CommonsDao.CLOSE_BRACKET);
				} else {
					result.append(CommonsDao.OPEN_BRACKET).append("null").append(CommonsDao.CLOSE_BRACKET);
				}
				result.append(", ");
			}
		}
		return result.toString();
	}
	
	
	/**
	 * <p>
	 * Transforma un <code>Map&lt;String, Object&gt;</code> en un
	 * <code>String</code>.
	 * </p>
	 * 
	 * Por lo general es usado para obtener la lista de parametros enviado a un
	 * stored procedure en el siguiente formato:
	 * param1=value1|param2=value2|param3=value3|...
	 * 
	 * @param params
	 *            <code>Map&lt;String, Object&gt;</code> par&aacute;metros.
	 * @return <code>String</code> con la informacion.
	 */
	@SuppressWarnings("rawtypes")
	public String transformMaptoStringWithoutCollection(
			final Map<String, Object> params) {
		StringBuffer result = new StringBuffer();
		DateFormat formatter = null;

		String key = null;
		Object obj = null;
		Object value = null;

		if (params != null) {
			for (Map.Entry<String, Object> entry : params.entrySet()) {
				key = entry.getKey();
				obj = entry.getValue();
				if (obj != null) {
					if (obj instanceof java.sql.Date) {
						formatter = new SimpleDateFormat(this.getPatternDate());
						value = formatter.format((java.sql.Date) obj);
					} else if (obj instanceof java.util.Date) {
						formatter = new SimpleDateFormat(this.getPatternDate());
						value = formatter.format((java.util.Date) obj);
					} else if (obj instanceof java.util.Calendar) {
						formatter = new SimpleDateFormat(this.getPatternDate());
						value = formatter.format(((java.util.Calendar) obj)
								.getTimeInMillis());
					} else if (obj instanceof java.util.Collection) {
						value = ((java.util.Collection) obj).size()
								+ " registros";
					} else {

						value = entry.getValue();
					}
				} else {
					value = "null";
				}
				result.append(key).append("=").append(value.toString());

				if (obj != null) {
					result.append(CommonsDao.OPEN_BRACKET).append(obj.getClass().getSimpleName())
							.append(CommonsDao.CLOSE_BRACKET);
				} else {
					result.append(CommonsDao.OPEN_BRACKET).append("null").append(CommonsDao.CLOSE_BRACKET);
				}
				result.append(", ");
			}
		}
		return result.toString();
	}

    /**
     * 
     * @param inParams
     * @param logger
     * @param args
     */

	public void writeInParamTrace(Map<String, Object> inParams,
			Logger logger, String... args) {
		
		String transaccion = args[0];
		String aplicacion = args[1];
		String origen = args[2];
		String metodo = args[3];
		String plataforma = args[4];
		String dataSource = args[5];
		String procedure = args[6];
		StringBuffer outParams = new StringBuffer(CommonsDao.PARAMETERS_IN);
		outParams.append(this.transformMaptoStringWithoutCollection(inParams));

		if (logger.isEnabledFor(Level.INFO)) {
			logger.log(Level.INFO, Arrays.toString(new String[] {transaccion,
					aplicacion, origen, metodo, plataforma, dataSource,
					procedure, outParams.toString()}));
		}
	
		
	}
	
	/**
	 * <p>
	 * Maneja cualquier error generado por la aplicaci&oacute;n.
	 * </p>
	 * 
	 * Los argumentos <code>String...</code> deben ser enviados en el siguiente
	 * orden: transaccion, aplicacion, origen, metodo, plataforma, dataSource,
	 * procedure.
	 * 
	 * @param ex
	 *            <code>Exception</code> excepcion generada por la
	 *            aplicaci&oacute;n.
	 * @param params
	 *            <code>Map&lt;String, Object&gt;</code> par&aacute;metros
	 *            usados para generar la excepci&oacute;n de seguros caracas y
	 *            escribir en el log.
	 * @param logger
	 *            <code>Logger</code> logger de la aplicaci&oacute;n.
	 * @param args
	 *            <code>String...</code> argumentos adicionales para su
	 *            escritura en el log de la aplicaci&oacute;n.
	 * @return excepci&oacute;n de seguros caracas.
	 */
	public Exception handleException(Exception e,
			Map<String, Object> params, Logger logger,
			String ... args) {
		String transaccion = args[0];
		String aplicacion = args[1];
		String origen = args[2];
		String metodo = args[3];
		String plataforma = args[4];
		String dataSource = args[5];
		String procedure = args[6];
		StringBuffer inParams = new StringBuffer(CommonsDao.PARAMETERS_IN);
		inParams.append(this.transformMaptoString(params));

		DgFarmException scex;

		scex = ManejadorExcepciones
				.manejar(aplicacion, origen, transaccion, this
						.getPlatformTrace(metodo, plataforma, dataSource,
								procedure), inParams.toString(), e);
		this.writeDgFarmExceptionTrace(logger, scex);
		return scex;
	}
    	
	/**
	 * <p>
	 * Realiza la escritura de la excepcion <code>SegurosCaracasException</code>
	 * , en el log.
	 * </p>
	 * 
	 * @param logger
	 *            <code>Logger</code> logger de la aplicaci&oacute;n.
	 * @param scex
	 *            <code>SegurosCaracasException</code> excepci&oacute;n usada
	 *            para escribir en el log.
	 */
	public void writeDgFarmExceptionTrace(final Logger logger,
			final DgFarmException scex) {
		StringBuffer outParams = new StringBuffer("Parameters Out: ");
		outParams.append(scex.getCodigo()).append(",")
				.append(scex.getMensaje());

		if (scex instanceof HandledException) {
			if (logger.isEnabledFor(Level.WARN)) {
				logger.log(
						Level.WARN,
						Arrays.toString(new String[] {scex.getTransaccion(),
								scex.getAplicacion(), scex.getOrigen(),
								scex.getPlataforma(), scex.getParamEntrada(),
								outParams.toString()}));
			}
		} else {
			if (logger.isEnabledFor(Level.ERROR)) {
				logger.log(
						Level.ERROR,
						Arrays.toString(new String[] {scex.getTransaccion(),
								scex.getAplicacion(), scex.getOrigen(),
								scex.getPlataforma(), scex.getParamEntrada(),
								outParams.toString()}), scex);
			}
		}
	}



	public String generateTransactionId(){
		StringBuffer transactionId = new StringBuffer("ID");
		
		Calendar now = Calendar.getInstance();
		
		transactionId.append(now.get(Calendar.YEAR));
		transactionId.append(now.get(Calendar.MONTH)+1);
		transactionId.append(now.get(Calendar.DAY_OF_MONTH));
		transactionId.append(now.get(Calendar.HOUR_OF_DAY));
		transactionId.append(now.get(Calendar.MINUTE));
		transactionId.append(now.get(Calendar.SECOND));
		transactionId.append(now.get(Calendar.MILLISECOND));
		
		return transactionId.toString();
	}
	
	/**
	 * <p>
	 * Obtiene la informaci&oacute;n completa de la plataforma (metodo del dao,
	 * plataforma, data source, stored procedure).
	 * </p>
	 * 
	 * @param method
	 *            <code>Sring</code> metodo del dao.
	 * @param platform
	 *            <code>Sring</code> plataforma que se accede a traves del dao.
	 * @param dataSource
	 *            <code>Sring</code> data source usado para concetarse a la
	 *            fuente de datos.
	 * @param procedure
	 *            <code>Sring</code> nombre del stored procedure invocado.
	 * 
	 * @return <code>String</code> con la informaci&oacute;n completa de la
	 *         plataforma.
	 */
	public String getPlatformTrace(final String method, final String platform,
			final String dataSource, final String procedure) {
		StringBuffer result = new StringBuffer();
		result.append(method).append("-").append(platform).append("-")
				.append(dataSource).append("-").append(procedure);
		return result.toString();
	}

	
	/**
	 * metodo utilitario para obtener el origen de la funcion
	 * @return
	 */
	public String getOrigen(){
		return (new StringBuffer(this.getClass().getCanonicalName())).toString();
	}
	
	public String getOrigen(String method){
		return (new StringBuffer(getOrigen()).append(".").append(method)).toString();
	}

	public Properties getApplicationProperties() {
		return applicationProperties;
	}

	public void setApplicationProperties(Properties applicationProperties) {
		this.applicationProperties = applicationProperties;
	}



	/**
	 * @return the patternDate
	 */
	public String getPatternDate() {
		return patternDate;
	}



	/**
	 * @param patternDate the patternDate to set
	 */
	public void setPatternDate(String patternDate) {
		this.patternDate = patternDate;
	}

}
