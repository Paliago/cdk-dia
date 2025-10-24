"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const testCases_1 = require("../../../test-fixtures/testCases");
const generator_test_1 = require("../../../diagram/tests/generator.test");
const cytoscape_1 = require("../cytoscape");
const basePath = `${process.cwd()}/test-generated`;
describe('Cytoscape static website generated as expected', () => {
    it.each(testCases_1.testCases)(`%# - %p`, async (testCase) => {
        const diagram = (0, generator_test_1.givenDiagram)(testCase);
        const filePath = `${basePath}/${testCase.jsonTreeFile}-${testCase.id}`;
        await new cytoscape_1.Cytoscape().render({
            diagram: diagram,
            path: filePath
        });
        const index = new File(`${filePath}/index.html`);
        expect(index.stats.size).toBeGreaterThanOrEqual(300);
        expect(index.body).toContain("CDK-Dia");
        const icons = new File(`${filePath}/icons`);
        expect(icons.stats.isDirectory()).toBeTruthy();
        const js = new File(`${filePath}/js`);
        expect(js.stats.isDirectory()).toBeTruthy();
        const elementsJson = new File(`${filePath}/cy-elements.json`);
        expect(JSON.parse(elementsJson.body).length).toBeGreaterThanOrEqual(2);
        const stylesJson = new File(`${filePath}/cy-styles.json`);
        expect(JSON.parse(stylesJson.body).length).toBeGreaterThanOrEqual(15);
    });
});
class File {
    constructor(path) {
        this.stats = fs.statSync(path);
        if (!this.stats.isDirectory()) {
            this.body = fs.readFileSync(path).toString();
        }
    }
}
//# sourceMappingURL=generator.test.js.map