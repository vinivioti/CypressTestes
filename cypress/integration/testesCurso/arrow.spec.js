const soma = () => 5 + 5

console.log(soma(1, 4))

it('a function test...', function() {
    console.log('Function', this)
})

it('an arrow test...', () => {
    console.log('Arrow', this)
})

// Faça uma revisão de ES6 -> Ecman Script 6