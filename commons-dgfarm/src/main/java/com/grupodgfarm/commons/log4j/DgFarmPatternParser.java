package com.grupodgfarm.commons.log4j;

import org.apache.log4j.helpers.FormattingInfo;
import org.apache.log4j.helpers.PatternConverter;
import org.apache.log4j.helpers.PatternParser;
import org.apache.log4j.spi.LoggingEvent;


public class DgFarmPatternParser extends PatternParser {
	


	/**
	 * <p>
	 * Define el patr&oacute;n del parser a utilizar.
	 * </p>
	 * 
	 * @param pattern
	 *            <code>String</code> define el patron del parser a utilizar.
	 */
	public DgFarmPatternParser(final String pattern) {
		super(pattern);
	}

	/**
	 * (non-Javadoc).
	 * 
	 * @see org.apache.log4j.helpers.PatternParser#finalizeConverter(char c)
	 */
	public void finalizeConverter(final char formatChar) {
		PatternConverter pc = null;
		String option;
		int index = 0;

		switch (formatChar) {
		case 'm':
			option = extractOption();
			try {
				if (option != null) {
					index = Integer.parseInt(option);
				}
			} catch (NumberFormatException e) {

			}

			pc = new DgFarmPatternConverter(formattingInfo, index);
			currentLiteral.setLength(0);
			this.addConverter(pc);
			break;
		default:
			super.finalizeConverter(formatChar);
		}
	}

	/**
	 * <p>
	 * Clase DgFarmPatternConverter.
	 * </p>
	 */
	private static class DgFarmPatternConverter extends
			PatternConverter {

		/**
		 * index.
		 */
		private int index;

		/**
		 * <p>
		 * Constructor.
		 * </p>
		 * 
		 * @param formattingInfo
		 *            <code>FormattingInfo</code>
		 * @param index
		 *            <code>int</code>
		 */
		DgFarmPatternConverter(final FormattingInfo formattingInfo,
				final int index) {
			super(formattingInfo);
			this.index = index;
		}

		/**
		 * (non-Javadoc).
		 * 
		 * @see org.apache.log4j.helpers.PatternConverter#convert(LoggingEvent
		 *      event)
		 */
		public String convert(final LoggingEvent event) {
			String result = null;
			Object[] messages;

			if (event.getMessage() instanceof Object[]) {
				messages = (Object[]) event.getMessage();

				if ((this.index >= 0) && (this.index < messages.length)
						&& (messages[this.index] != null)) {
					result = messages[this.index].toString().replace('\n', ' ')
							.replace('\r', ' ');
				}
			} else if ((this.index == 0) && (event.getMessage() != null)) {
				result = event.getMessage().toString().replace('\n', ' ')
						.replace('\r', ' ');
			}
			return (result);
		}
	}
}

