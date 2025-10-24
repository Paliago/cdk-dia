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
const graphviz_1 = require("../graphviz");
const testCases_1 = require("../../../test-fixtures/testCases");
const generator_test_1 = require("../../../diagram/tests/generator.test");
const path = __importStar(require("path"));
if (global['jest-specific-init'] == undefined) {
    global['jest-specific-init'] = true;
    require("jest-specific-snapshot");
}
jest.setTimeout(3000000);
const basePath = `${process.cwd()}/test-generated`;
describe("diagram converted to DOT file as expected", () => {
    testCases_1.testCases.forEach(test => {
        it(`${test.cdkTreePath} - ${test.jsonTreeFile} - ${test.id}`, async () => {
            const diagram = (0, generator_test_1.givenDiagram)(test);
            const generator = new graphviz_1.Graphviz();
            const dotFilePath = `${basePath}/${test.jsonTreeFile}-${test.id}.dot`;
            generator.renderToDot(diagram, dotFilePath);
            const pathToSnap = path.resolve(process.cwd(), `./snapshots/diagram-converted-to-DOT-file-as-expected-${test.jsonTreeFile}-${test.id}.snapshot`);
            expect(fs.readFileSync(dotFilePath).toString()).toMatchSpecificSnapshot(pathToSnap);
        });
    });
});
//# sourceMappingURL=generator.test.js.map