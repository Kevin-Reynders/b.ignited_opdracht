# b.ignited_opdracht
Opdracht b.ignited

## Run instructies

Executing it with a report being written and opening up once it's finished
```
npx playwright test
```

Execute only a specific browser
```
npx playwright test --project chromium
```

Executing the program in UI mode
```
npx playwright test --ui
```

Executing the program in a specific browser while seeing what the program is doing by opening the browsers visually
```
npx playwright test --project chromium --headed 
```

Open the last HTML report run
```
npx playwright show-report 
```


## Explanation

In total, I have written 7 test scenario's, whereas 5 test in a positive way, and 2 in a negative way.
The positive scenarios test mainly what the programma is supposed to do, so what the expected behavior actually is.
The negative scenarios test mainly the errors, or precisely the wrong input that the page should correctly block.

The main goal was to make sure the number plate generator works as expected, but also to show how I make these tests.

### What I did
In the beginning, I started checking out the page manually (explorative testing), exploring it a bit and checking what id's were available to easily access certain elements.

As I need to keep re-usability in mind, I've made a general TestdataGenerator page, as this same class, could be used somewhere else too. I'm only defining the locators for the elements that I initially intend to use, though over time some unused ones will still be there for consistency sake.

Based further on that, my initial thought was to have a basic test that just generates a correct license plate. Check.
Check if elements related to the numberplate generator are properly visible. Check.
Generate more than one, making sure that generated numberplates are never the same, no matterhow many times someone would generate one. Check.

Due to how often certain functions came back, I've added some related to the page.
For example ```openNumberplateGenerator()```
I want to consistently open the generator when I start my tests, but it requires multiple steps to do so, so instead of writing in this case 4 lines in each test, I just refer to this, and it does the same.

Same goes for the plate-types and the plate-format, but in a different sense. Once a list contains multiple options, it's better to make sure the selecting of these items is consistent, whereas a typo can cause a failure.

Negative scenario's go over the incorrect input, and the "correct" responses it needs to give when something isn't correct.
Because of the negative scenario's I did find a tiny bug in the input of amount.
As long as the number is between 1 and 100, the page says it's correct, but the amount also accepts 1.5 for example, which it interprets it as 1, always rounded down, even 1.99 = 1