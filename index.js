// const error = new Error('Template Error');
// error.statusCode = 10000;
// const f1 = () => {
//     throw error;
// }

// try {
//     f1();
// } catch (error) {
//     console.log(error.message, error.statusCode);
// }
try {
    const obj = { name: 0 };
    console.log(ok);
} catch (error) {
    console.log(Object.keys(error))
}
