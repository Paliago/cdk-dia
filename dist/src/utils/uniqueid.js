"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUniqueId = makeUniqueId;
const crypto_1 = __importDefault(require("crypto"));
class UnscopedValidationError extends Error {
}
function unresolved(x) {
    return /\${Token\[.*?]}/.test(x);
}
function md5hash(text) {
    return crypto_1.default.createHash("md5").update(text).digest("hex");
}
const HIDDEN_FROM_HUMAN_ID = 'Resource';
const HIDDEN_ID = 'Default';
const PATH_SEP = '/';
const HASH_LEN = 8;
const MAX_HUMAN_LEN = 240;
const MAX_ID_LEN = 255;
function makeUniqueId(components) {
    components = components.filter(x => x !== HIDDEN_ID);
    if (components.length === 0) {
        throw new UnscopedValidationError('Unable to calculate a unique id for an empty set of components');
    }
    const unresolvedTokens = components.filter(c => unresolved(c));
    if (unresolvedTokens.length > 0) {
        throw new UnscopedValidationError(`ID components may not include unresolved tokens: ${unresolvedTokens.join(',')}`);
    }
    if (components.length === 1) {
        const candidate = removeNonAlphanumeric(components[0]);
        if (candidate.length <= MAX_ID_LEN) {
            return candidate;
        }
    }
    const hash = pathHash(components);
    const human = removeDupes(components)
        .filter(x => x !== HIDDEN_FROM_HUMAN_ID)
        .map(removeNonAlphanumeric)
        .join('')
        .slice(0, MAX_HUMAN_LEN);
    return human + hash;
}
function pathHash(path) {
    const md5 = md5hash(path.join(PATH_SEP));
    return md5.slice(0, HASH_LEN).toUpperCase();
}
function removeNonAlphanumeric(s) {
    return s.replace(/[^A-Za-z0-9]/g, '');
}
function removeDupes(path) {
    const ret = new Array();
    for (const component of path) {
        if (ret.length === 0 || !ret[ret.length - 1].endsWith(component)) {
            ret.push(component);
        }
    }
    return ret;
}
//# sourceMappingURL=uniqueid.js.map