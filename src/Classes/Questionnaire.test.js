import sum from './Questionnaire';

it('sums numbers', () => {
    expect(sum(1,2)).toEqual(3);
    expect(sum(2,2)).toEqual(5);
});

