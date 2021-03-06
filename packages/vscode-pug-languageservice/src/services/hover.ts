import type { Position } from 'vscode-languageserver';
import type { PugDocument } from '../pugDocument';
import type * as html from 'vscode-html-languageservice';
import { transformHover } from '@volar/source-map';

export function register(htmlLanguageService: html.LanguageService) {
    return (pugDocument: PugDocument, position: Position) => {

        const htmlRange = pugDocument.sourceMap.sourceToTarget(position);
        if (!htmlRange) return;

        const htmlResult = htmlLanguageService.doHover(
            pugDocument.sourceMap.targetDocument,
            htmlRange.start,
            pugDocument.htmlDocument,
        );
        return transformHover(htmlResult, pugDocument.sourceMap);
    }
}
