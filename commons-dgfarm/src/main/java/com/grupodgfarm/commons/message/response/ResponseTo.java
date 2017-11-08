package com.grupodgfarm.commons.message.response;

import java.io.Serializable;

public class ResponseTo implements Serializable {

	/**
	 * Serial generado aleatoriamente.
	 */
	private static final long serialVersionUID = 6772897860385986059L;
	
	
	/**
	 * C&oacute;digo de la transacci&oacute;n.
	 */
	private String transaccion;

	/**
	 * Tiempo de ejecuci&oacute;n.
	 */
	private Double tiempo;

	/**
	 * @return the transaccion
	 */
	public String getTransaccion() {
		return transaccion;
	}

	/**
	 * @param transaccion the transaccion to set
	 */
	public void setTransaccion(String transaccion) {
		this.transaccion = transaccion;
	}

	/**
	 * @return the tiempo
	 */
	public Double getTiempo() {
		return tiempo;
	}

	/**
	 * @param tiempo the tiempo to set
	 */
	public void setTiempo(Double tiempo) {
		this.tiempo = tiempo;
	}


}
