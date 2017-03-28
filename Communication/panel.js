function do_something(msg) {
    document.body.textContent += '\n' + msg; // Stupid example, PoC
}
document.documentElement.onclick = function() {
    // No need to check for the existence of `respond`, because
    // the panel can only be clicked when it's visible...
    respond('Another stupid example!');
};
