export const compose = (...fs) => x => fs.reduceRight((acc, f) => f(acc), x)

export const randomNumber = () => Math.floor(Math.random() * 100)