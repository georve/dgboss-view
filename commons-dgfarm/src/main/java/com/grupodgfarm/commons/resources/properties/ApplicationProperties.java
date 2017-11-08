package com.grupodgfarm.commons.resources.properties;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;


import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;


/**
 * <p>
 * Clase usada para acceder a las propiedades (proyecto.properties) definidas
 * para una aplicaci&oacute;n.
 * </p>
 * 
 * @author <a href="mailto:geormancalderon@grupodigifarm.com">Georman Calderon</a>
 * @version 1.0
 */

public class ApplicationProperties extends PropertyPlaceholderConfigurer {


	/**
	 * <code>Map</code> que contiene las propiedades definidas para la
	 * aplicaci&oacute;n.
	 */
	private static Map<String, String> properties = new HashMap<String, String>();
	

	/*
	 * (non-Javadoc)
	 */
	@Override
	protected void loadProperties(final Properties props) throws IOException {
		super.loadProperties(props);
		System.out.println("<----load properties-->");
		for (final Object key : props.keySet()) {
			 properties.put((String) key, props.getProperty((String) key));
		}
	}

	/**
	 * Retorna el valor de una propiedad, dado su nombre.
	 * 
	 * @param name
	 *            <code>String</code> nombre de la propieda
	 * @return <code>String</code> con el valor de la propiedad.
	 */
	public static  String getProperty(final String name) {
		return properties.get(name);
	}
}