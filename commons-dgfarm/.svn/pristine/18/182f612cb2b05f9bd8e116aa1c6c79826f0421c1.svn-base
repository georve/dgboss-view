package com.grupodgfarm.commons.log4j;

import org.apache.log4j.PatternLayout;
import org.apache.log4j.helpers.PatternParser;
import org.apache.log4j.spi.LoggingEvent;

public class DgFarmPatternLayout extends PatternLayout {

	
	
	public DgFarmPatternLayout() {
		super(DEFAULT_CONVERSION_PATTERN);
	}

	public DgFarmPatternLayout(String pattern) {
		super(pattern);
	}
	
	/**
	 * (non-Javadoc).
	 * 
	 * @see org.apache.log4j.PatternLayout#createPatternParser(String pattern)
	 */
	public PatternParser createPatternParser(final String pattern) {
		DgFarmPatternParser result;
		if (pattern == null) {
			result = new DgFarmPatternParser(DEFAULT_CONVERSION_PATTERN);
		} else {
			result = new DgFarmPatternParser(pattern);
		}
		return result;
	}

	@Override
	public String format(LoggingEvent event) {
		return super.format(event);
	}
	
	
	
}
