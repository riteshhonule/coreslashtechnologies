import { Readable } from 'stream';

// Mock TTY checks
Object.defineProperty(process.stdin, 'isTTY', { value: true, configurable: true });
Object.defineProperty(process.stdout, 'isTTY', { value: true, configurable: true });
Object.defineProperty(process.stderr, 'isTTY', { value: true, configurable: true });

// Create custom stdin readable stream
const mockStdin = new Readable({
  read(size) {
    this.push('y\n');
    this.push(null); // EOF
  }
});

// Mock process.stdin
Object.defineProperty(process, 'stdin', { value: mockStdin, configurable: true });

// Set arguments for Prisma CLI
process.argv = [...process.argv.slice(0, 2), 'migrate', 'dev', '--name', 'init_certificate_v2'];

// Require/Run Prisma CLI
require('../node_modules/prisma/build/index.js');
