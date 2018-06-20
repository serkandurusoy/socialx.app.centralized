# SocialX - Coding best practices

This is an open list. We now have <10 points but over time hope we will get it more comprehensive.
Anyone can contribute here and suggest other better practices :) 

1. Use new ref API, [here](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs)
1. Try to destructure props where possible.
1. Prefere small SFC components instead of function calls to render different parts of a big component.
1. In lists try not to use an index as key property. Instead we should try to use the data ID field that should be available for data entries in all list.
1. Stop using navigation as a state store (TBD)
1. Avoid using mutating prototype methods such as `push` with `Array`.
1. Don't create functions or constants for expressions that are used once, use them directly inline
