type TRoll = { userId: number; sides: number; value: number; total: number };

/**
 * Declares the contract between your plugin and Sharkord. Use this to have some type safety when calling actions, commands and receiving pushes.
 */
type TPlugin = {
  actions: { roll: { payload: { sides: number }; response: TRoll } };
  commands: { roll: { args: { sides: number }; response: string } };
  push: TRoll;
};

export type { TRoll, TPlugin };
