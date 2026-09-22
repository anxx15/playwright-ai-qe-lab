async function waitForCondition(
    condition: () => Promise<boolean>,
    timeoutMs: number,
    intervalMs: number
) {
    const start = Date.now();

    while (Date.now() - start < timeoutMs) {

        if (await condition()) {
            return;
        }

        await new Promise(resolve =>
            setTimeout(resolve, intervalMs)
        );
    }

    throw new Error('Condition not met within timeout');
}