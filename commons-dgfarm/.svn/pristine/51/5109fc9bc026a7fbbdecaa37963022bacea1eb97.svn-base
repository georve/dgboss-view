package com.grupodgfarm.commons.exception;

public abstract class DgFarmException extends Exception {

	/**
	 * Serial generado aleatoriamente.
	 */
	private static final long serialVersionUID = -7537186102611912833L;
	
	/**
	 * Identificador de la transacci&oacute;n.
	 * 
	 * @uml.property name="transaccion"
	 */
	private String transaccion;

	/**
	 * El nombre de la aplicaci&oacute;n que dispara la excepci&oacute;n.
	 * 
	 * @uml.property name="aplicacion"
	 */
	private String aplicacion;

	/**
	 * Nombre de la clase con el m&eacute;todo, donde se gener&oacute; la
	 * excepci&oacute;n. El formato de este atributo es:
	 * <code>paquete.clase.metodo</code>
	 * 
	 * @uml.property name="origen"
	 */
	private String origen;

	/**
	 * El c&oacute;digo de error asociado a la excepci&oacute;n. Puede ser un
	 * codigo de error est&aacute;ndar o un c&oacute;digo creado especificamente
	 * para la aplicaci&oacute;n.
	 * 
	 * @uml.property name="codigo"
	 */
	private Integer codigo;


	/**
	 * El mensaje de error asociado a la excepci&oacute;n. Puede ser un mensaje
	 * de error estandar o un mensaje creado especificamente para la
	 * aplicaci&oacute;n.
	 * 
	 * @uml.property name="mensaje"
	 */
	private String mensaje;

	/**
	 * <p>
	 * Nombre de la plataforma sobre el cual se apoya la aplicaci&oacute;n para
	 * dar respuesta.
	 * </p>
	 * En el caso de la capa del Dao, el atributo se encuentra compuesto de la
	 * siguiente informaci&oacute;n: Plataforma  Datasource  Componente
	 * <ul>
	 * <li>Plataforma: Informaci&oacute;n de la plataforma que es accedida a
	 * trav&eacute;s de la clase de Dao</li>
	 * <li>Datasource: Nombre del datasource a trav&eacute;s del cual se
	 * solicita la conexi&oacute;n (este par&aacute;metro solo aplica cuando la
	 * plataforma es una base de datos)</li>
	 * <li>Componente: Nombre del componente (funci&oacute;n, procedimiento,
	 * m&eacute;todo, etc.) que es invocado en la plataforma.</li>
	 * </ul>
	 * 
	 * @uml.property name="plataforma"
	 */
	private String plataforma;

	/**
	 * <p>
	 * Par&aacute;metros de entrada usados para invocar el(los) componente(s)
	 * que dan respuesta a la solicitud.
	 * </p>
	 * El formato para definir este campo es el siguiente: atributo1=valor1,
	 * atributo2=valor2, atributo3=valor3...
	 * 
	 * @uml.property name="paramEntrada"
	 */
	private String paramEntrada;

	/**
	 * Contructor por defecto
	 */

	public DgFarmException() {
		super();
	}
	

	/**
	 * Constructor de la excepci&oacute;n.
	 * 
	 * 
	 * @param aplicacion
	 *            <code>String</code> nombre de la aplicaci&oacute;n que dispara
	 *            la excepci&oacute;n
	 * @param origen
	 *            <code>String</code> nombre de la clase con el m&eacute;todo,
	 *            donde se gener&oacute; la excepci&oacute;n.
	 * @param codigo
	 *            <code>int</code> c&oacute;digo de error asociado a la
	 *            excepci&oacute;n.
	 * @param mensaje
	 *            <code>String</code> mensaje de error asociado a la
	 *            excepci&oacute;n.
	 */
	public DgFarmException(final String aplicacion,
			final String origen, final int codigo, final String mensaje) {
		super(mensaje);

		this.aplicacion = aplicacion;
		this.origen = origen;
		this.codigo = codigo;
		this.mensaje = mensaje;
	}



	

	/**
	 * Constructor de la excepci&oacute;n.
	 * 
	 * @param aplicacion
	 *            <code>String</code> nombre de la aplicaci&oacute;n que dispara
	 *            la excepci&oacute;n
	 * @param origen
	 *            <code>String</code> nombre de la clase con el m&eacute;todo,
	 *            donde se gener&oacute; la excepci&oacute;n.
	 * @param codigo
	 *            <code>String</code> c&oacute;digo de error asociado a la
	 *            excepci&oacute;n.
	 * @param mensaje
	 *            <code>String</code> mensaje de error asociado a la
	 *            excepci&oacute;n.
	 * @param cause
	 *            <code>String</code> excepci&oacute;n original que es la causa
	 *            por la cual se disparo esta excepci&oacute;n
	 */
	public DgFarmException(final String aplicacion,
			final String origen, final int codigo, final String mensaje,
			final Throwable cause) {
		super(mensaje, cause);
		this.aplicacion = aplicacion;
		this.origen = origen;
		this.codigo = codigo;
		this.mensaje = mensaje;
	}

	/**
	 * Constructor de la excepci&oacute;n.
	 * 
	 * @param aplicacion
	 *            <code>String</code> nombre de la aplicaci&oacute;n que dispara
	 *            la excepci&oacute;n
	 * @param origen
	 *            <code>String</code> nombre de la clase con el m&eacute;todo,
	 *            donde se gener&oacute; la excepci&oacute;n.
	 * @param codigo
	 *            <code>String</code> c&oacute;digo de error asociado a la
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
	 */
	public DgFarmException(final String aplicacion,
			final String origen, final int codigo, final String mensaje,
			final String transaccion, final String plataforma,
			final String paramEntrada) {
		super(mensaje);
		this.aplicacion = aplicacion;
		this.origen = origen;
		this.codigo = codigo;
		this.mensaje = mensaje;
		this.transaccion = transaccion;
		this.plataforma = plataforma;
		this.paramEntrada = paramEntrada;
	}

	/**
	 * Constructor de la excepci&oacute;n.
	 * 
	 * @param aplicacion
	 *            <code>String</code> nombre de la aplicaci&oacute;n que dispara
	 *            la excepci&oacute;n
	 * @param origen
	 *            <code>String</code> nombre de la clase con el m&eacute;todo,
	 *            donde se gener&oacute; la excepci&oacute;n.
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
	 * @param cause
	 *            <code>String</code> excepci&oacute;n original que es la causa
	 *            por la cual se disparo esta excepci&oacute;n
	 */
	public DgFarmException(final String aplicacion,
			final String origen, final int codigo, final String mensaje,
			final String transaccion, final String plataforma,
			final String paramEntrada, final Throwable cause) {
		super(mensaje, cause);
		this.aplicacion = aplicacion;
		this.origen = origen;
		this.codigo = codigo;
		this.mensaje = mensaje;
		this.transaccion = transaccion;
		this.plataforma = plataforma;
		this.paramEntrada = paramEntrada;
	}

	public DgFarmException(String mensaje, Throwable ex) {
		super(mensaje, ex);
	}

	public String getTransaccion() {
		return transaccion;
	}

	public void setTransaccion(String transaccion) {
		this.transaccion = transaccion;
	}

	public String getAplicacion() {
		return aplicacion;
	}

	public void setAplicacion(String aplicacion) {
		this.aplicacion = aplicacion;
	}

	public String getOrigen() {
		return origen;
	}

	public void setOrigen(String origen) {
		this.origen = origen;
	}

	public Integer getCodigo() {
		return codigo;
	}

	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}

	public String getMensaje() {
		return mensaje;
	}

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	public String getPlataforma() {
		return plataforma;
	}

	public void setPlataforma(String plataforma) {
		this.plataforma = plataforma;
	}

	public String getParamEntrada() {
		return paramEntrada;
	}

	public void setParamEntrada(String paramEntrada) {
		this.paramEntrada = paramEntrada;
	}

	public DgFarmException(String arg0) {
		super(arg0);
	}

	public DgFarmException(Throwable arg0) {
		super(arg0);
	}

}
