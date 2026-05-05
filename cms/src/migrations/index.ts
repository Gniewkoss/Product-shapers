import * as migration_20260505_174545 from './20260505_174545';
import * as migration_20260505_211012 from './20260505_211012';

export const migrations = [
  {
    up: migration_20260505_174545.up,
    down: migration_20260505_174545.down,
    name: '20260505_174545',
  },
  {
    up: migration_20260505_211012.up,
    down: migration_20260505_211012.down,
    name: '20260505_211012'
  },
];
