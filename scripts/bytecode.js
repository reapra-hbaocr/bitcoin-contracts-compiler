/**
 * Copyright 2014 Curiosity driven
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

function getByteCode(source) {
    var block = parser(lexer(source)).parseBlock();
    block = inlineVariables(block, operators);
    // promote VERIFY to the top
    block = block.transform(extractVerify);
    // mark last function calls
    block = block.transform(new LastFunctionCallMarker());
    // generate intermediate bytecode from AST
    return block.transform(new IntermediateCodeEmitter(operators));
}
