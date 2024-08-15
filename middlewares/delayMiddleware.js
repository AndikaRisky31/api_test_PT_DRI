export const delayMiddleware = (req, res, next) => {
    const delay = parseInt(req.query.delay) || 1000; // Ambil nilai delay dari query string, default 0 ms

    if (delay > 0) {
        console.log(`Delaying response by ${delay} ms...`);
        setTimeout(() => {
            next(); // Lanjutkan ke handler berikutnya setelah delay
        }, delay);
    } else {
        next(); // Tidak ada delay, lanjutkan ke handler berikutnya
    }
};
