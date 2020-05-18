'use strict';

const { readFileSync, readdirSync, writeFileSync } = require('fs');

// Get all markdown stubs
const header = readFileSync('bundler/header.md', 'utf-8');
const badges = readFileSync('bundler/badges.md', 'utf-8');
const installation = readFileSync('bundler/installation.md', 'utf-8');
const utilization = readFileSync('bundler/utilization.md', 'utf-8');
const api = readFileSync('bundler/api.md', 'utf-8');
const extend = readFileSync('bundler/extend.md', 'utf-8');
const hooks = readFileSync('bundler/hooks.md', 'utf-8');
const errors = readFileSync('bundler/errors.md', 'utf-8');
const vue = readFileSync('bundler/vue.md', 'utf-8');
const changelog = readFileSync('bundler/change_log.md', 'utf-8');

// const strictnessAndComparisons = readFileSync('bundler/strictness_and_comparisons.md', 'utf-8');
// const notImplemented = readFileSync('bundler/not_implemented.md', 'utf-8');
const contribute = readFileSync('bundler/contribute.md', 'utf-8');
const license = readFileSync('bundler/license.md', 'utf-8');

// Get all API docs
const methods = readdirSync('docs/api', 'utf-8');

// build table of contents
const tableOfContents = methods.map((file) => {
	const methodName = file.replace('.md', '');

	return `- [${methodName}](#${methodName.toLowerCase()}-rule)`;
}).join('\n');

// Build methods "readme"
const methodDocumentation = methods.map((file) => {
	let content = readFileSync(`docs/api/${file}`, 'utf-8');

	const lines = content.split('\n');

	lines[0] = `#${lines[0]}`;
	lines.pop();
	lines.pop();

	content = lines.join('\n');
	content = content.replace(/(\r\n|\r|\n){2,}/g, '$1\n');

	return content;
}).join('\n\n');


const errorMessages = readdirSync('docs/errors', 'utf-8');
const errorMessagesTableOfContents = errorMessages.map((file) => {
	const errorMessageMethod = file.replace('.md', '');

	return `- [${errorMessageMethod}](#${errorMessageMethod.toLowerCase()})`;
}).join('\n');

// Build methods "readme"
const errorMessagesDocumentation = errorMessages.map((file) => {
	let content = readFileSync(`docs/errors/${file}`, 'utf-8');

	const lines = content.split('\n');

	lines[0] = `#${lines[0]}`;
	lines.pop();
	lines.pop();

	content = lines.join('\n');
	content = content.replace(/(\r\n|\r|\n){2,}/g, '$1\n');

	return content;
}).join('\n\n');

writeFileSync(
	'README.md',
	[
		badges,
		installation,
		vue,
		header,
		api,
		tableOfContents,
		methodDocumentation,
		errorMessagesTableOfContents,
		errorMessagesDocumentation,
		hooks,
		extend,
		utilization,
		contribute,
		license,
		changelog,
	].join('\n\n'),
);
