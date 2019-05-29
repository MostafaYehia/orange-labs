import {
  trigger,
  transition,
  stagger,
  animate,
  style,
  query,
  state
} from "@angular/animations";

/**
 * Reusable Animation Set
 */

// Load list items from right to left smoothely
export const rtlInsertion = (name: string, duration: number) => {
  return trigger(name, [
    transition("* => *", [
      // each time the binding value changes
      query(
        ":leave",
        [stagger(100, [animate(`${duration}s`, style({ opacity: 0 }))])],
        {
          optional: true
        }
      ),
      query(
        ":enter",
        [
          style({ left: "20px" }),
          stagger(100, [animate(`${duration}s`, style({ left: "0" }))])
        ],
        {
          optional: true
        }
      )
    ])
  ]);
};

// Load list items from right to left smoothely
export const fadeInUp = (name: string, duration: number) => {
  return trigger(name, [
    transition("* => *", [
      // each time the binding value changes
      query(
        ":leave",
        [stagger(200, [animate(`${duration}s`, style({ opacity: 0 }))])],
        {
          optional: true
        }
      ),
      query(
        ":enter",
        [
          style({ transform: "translateY(10%)", opacity: 0 }),
          stagger(200, [
            animate(
              `${duration}s`,
              style({ transform: "translateY(0)", opacity: 1 })
            )
          ])
        ],
        {
          optional: true
        }
      )
    ])
  ]);
};

// Load list items from right to left smoothely
export const fadeSlideIn = (name: string, duration: number) => {
  return trigger(name, [
    state(
      "hide",
      style({
        opacity: 0
      })
    ),
    state(
      "show",
      style({
        opacity: 1
      })
    ),
    transition("hide <=> show", [animate(`${duration}s`)])
  ]);
};
