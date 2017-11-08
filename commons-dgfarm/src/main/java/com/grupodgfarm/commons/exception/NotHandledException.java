package com.grupodgfarm.commons.exception;

public class NotHandledException extends DgFarmException {

	/**
	 * Serial generado aleatoriamente.
	 */
	private static final long serialVersionUID = -1148643197322783503L;

	public NotHandledException() {
		super();
	}

	public NotHandledException(String arg0, Throwable arg1) {
		super(arg0, arg1);
	}

	public NotHandledException(String arg0) {
		super(arg0);
	}

	public NotHandledException(Throwable arg0) {
		super(arg0);
	}
	
	public NotHandledException(String aplicacion, String origen,
			int codigo,String mensaje,String transaccion,
			String plataforma, String paramEntrada,Throwable cause){
		
		super(aplicacion,origen,codigo,mensaje,transaccion,plataforma,paramEntrada,cause);
		
	}

}
