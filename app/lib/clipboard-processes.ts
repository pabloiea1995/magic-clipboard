/* eslint-disable no-console */
import ioHook from 'iohook';
import memory from './clipboard-memory';

const ClipboardListener = require('clipboard-listener');

function start(): void {
  /*
   * Create a new instance
   */
  console.log('Watching clipboard');
  const listener = new ClipboardListener({
    timeInterval: 100,
    immediate: true,
  });

  ioHook.start(false);
  listener.watch();

  /*
   * Start listening to clipboard changes
   */
  listener.on('change', (value: string) => {
    if (value && value !== '') {
      memory.addToMemory(value);
    }
  });
}

export default {
  start,
  memory,
};
