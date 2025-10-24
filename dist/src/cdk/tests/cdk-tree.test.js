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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = __importStar(require("../cdk-tree"));
const testCases_1 = require("../../test-fixtures/testCases");
const tree_json_loader_1 = require("../tree-json-loader");
const path_1 = __importDefault(require("path"));
if (global['jest-specific-init'] == undefined) {
    global['jest-specific-init'] = true;
    require("jest-specific-snapshot");
}
describe("cdk-tree parsing", () => {
    testCases_1.testCases.forEach(test => {
        it(`${test.cdkTreePath} - ${test.jsonTreeFile} - ${test.id}`, () => {
            const cdkTree = tree_json_loader_1.TreeJsonLoader.load(`${test.cdkTreePath}${test.jsonTreeFile}.json`);
            const pathToSnap = path_1.default.resolve(process.cwd(), `./snapshots/cdk-tree-parsing-as-expected-${test.jsonTreeFile}-${test.id}.snapshot`);
            expect(cdkTree.tree).toMatchSpecificSnapshot(pathToSnap);
        });
    });
});
describe('cdk-tree', () => {
    it('fromComponent() - parses exports', () => {
        const exportsNode = cdk.Node.fromObject({
            "id": "Exports",
            "path": "stack-with-topic/Exports",
            "children": {
                "Output{\"Ref\":\"thetopic9E1A294D\"}": {
                    "id": "Output{\"Ref\":\"thetopic9E1A294D\"}",
                    "path": "stack-with-topic/Exports/Output{\"Ref\":\"thetopic9E1A294D\"}",
                    "constructInfo": {
                        "fqn": "aws-cdk-lib.CfnOutput",
                        "version": "2.0.0"
                    }
                }
            },
            "constructInfo": {
                "fqn": "constructs.Construct",
                "version": "10.0.9"
            }
        });
        expect(exportsNode.id).toEqual("Exports");
    });
    it('shouldBeIgnored() - returns true for metadata annotation', () => {
        const ignoredNode = cdk.Node.fromObject({
            "id": "IgnoredResource",
            "path": "stack/IgnoredResource",
            "metadata": {
                "aws:cdk:info": ["cdk-dia:ignore"]
            }
        });
        expect(ignoredNode.shouldBeIgnored()).toBe(true);
    });
    it('shouldBeIgnored() - returns true for attribute annotation', () => {
        const ignoredNode = cdk.Node.fromObject({
            "id": "IgnoredResource",
            "path": "stack/IgnoredResource",
            "attributes": {
                "CDK-DIA_ignore": "true"
            }
        });
        expect(ignoredNode.shouldBeIgnored()).toBe(true);
    });
    it('shouldBeIgnored() - returns false for non-ignored node', () => {
        const normalNode = cdk.Node.fromObject({
            "id": "NormalResource",
            "path": "stack/NormalResource"
        });
        expect(normalNode.shouldBeIgnored()).toBe(false);
    });
    it('shouldBeIgnored() - returns false for other info annotations', () => {
        const nodeWithOtherInfo = cdk.Node.fromObject({
            "id": "ResourceWithInfo",
            "path": "stack/ResourceWithInfo",
            "metadata": {
                "aws:cdk:info": ["some-other-info"]
            }
        });
        expect(nodeWithOtherInfo.shouldBeIgnored()).toBe(false);
    });
});
//# sourceMappingURL=cdk-tree.test.js.map