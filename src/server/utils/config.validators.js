const path = require('path');

/**
 * @description Helper for validating SSL Config
 */
let validSSLConfiguration = (config = {}) => {
	// We should validate these can be loaded, not just are configured
	return config.key && config.cert;
};

/**
 * @description Helper for validating Adapters for profiles
 */
let loadProfile = (key, profile = {}) => {
	if (typeof profile.service === 'string') {
		try {
			profile.service = require(path.resolve(profile.service));
		} catch (err) {
			// Let's throw a more informative error than the default
			throw new Error(
				`Unable to load service for ${key} profile.`
				+ ` Check your configuration for the ${key} profile and`
				+ ' make sure the path is correct or pass the module in directly.'
			);
		}
	}
	return profile.service;
};

module.exports = {
	validSSLConfiguration,
	loadProfile
};
