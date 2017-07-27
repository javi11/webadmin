/*
 * Copyright (c) 2017 AXA Group Solutions.
 *
 * Licensed under the AXA Group Solutions License (the "License")
 * you may not use this file except in compliance with the License.
 * A copy of the License can be found in the LICENSE.TXT file distributed
 * together with this file.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');

class Logger {
  constructor({ logLevel = 'debug', name, production }) {
    if (!name) throw new Error('Name parameter is mandatory');
    const prettyStream = new PrettyStream();
    prettyStream.pipe(process.stdout);
    const stream = production ? process.stdout : prettyStream;
    this.logger = bunyan.createLogger({
      name,
      src: true,
      level: logLevel,
      stream
    });
  }
  logger() {
    return this.logger;
  }
}

module.exports = Logger;
