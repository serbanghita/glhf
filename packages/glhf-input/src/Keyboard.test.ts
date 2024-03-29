import Keyboard, {InputActions} from "./Keyboard";

describe("Keyboard", () => {
    it('binding', () => {
       const input = new Keyboard();
       input.bindKey('w', InputActions.MOVE_UP);
       input.bindKey('a', InputActions.MOVE_LEFT);
       input.bindKey('s', InputActions.MOVE_DOWN);
       input.bindKey('d', InputActions.MOVE_RIGHT);

        expect(input.isBoundKey('w')).toBe(true);
        expect(input.isBoundKey('a')).toBe(true);
        expect(input.isBoundKey('s')).toBe(true);
        expect(input.isBoundKey('d')).toBe(true);
    });

    it('actions', () => {
        const input = new Keyboard();
        input.bindKey('w', InputActions.MOVE_UP);
        input.bindKey('a', InputActions.MOVE_LEFT);

        // Simulate key press.
        input.keyDownCallback({key: 'w', preventDefault: () => {}, stopPropagation: () => {}});
        input.keyDownCallback({key: 'w', preventDefault: () => {}, stopPropagation: () => {}});
        input.keyDownCallback({key: 'a', preventDefault: () => {}, stopPropagation: () => {}});
        input.keyDownCallback({key: 'w', preventDefault: () => {}, stopPropagation: () => {}});
        input.keyDownCallback({key: 'a', preventDefault: () => {}, stopPropagation: () => {}});

        expect(input.ongoingActions.has(InputActions.MOVE_UP)).toBe(true);
        expect(input.ongoingActions.has(InputActions.MOVE_LEFT)).toBe(true);
        expect(input.ongoingActions.size).toEqual(2);

        // Simulate key-up.
        input.keyUpCallback({key: 'w', preventDefault: () => {}, stopPropagation: () => {}});
        input.keyUpCallback({key: 'a', preventDefault: () => {}, stopPropagation: () => {}});

        expect(input.ongoingActions.size).toEqual(0);
    });

    it('areKeysPressed', () => {
        const input = new Keyboard();
        input.bindKey('w', InputActions.MOVE_UP);
        input.keyDownCallback({key: 'w', preventDefault: () => {}, stopPropagation: () => {}});

        expect(input.areKeysPressed()).toBe(true);
    });
});