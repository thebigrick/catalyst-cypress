Cypress.Commands.add('dragHorizontal', { prevSubject: 'element' }, (subject, pixels) => {
    const rect = subject[0].getBoundingClientRect();
    const startX = rect.x + rect.width / 2;
    const startY = rect.y + rect.height / 2;

    subject
        .trigger('pointerdown', { clientX: startX, clientY: startY, button: 0 })
        .trigger('pointermove', { clientX: startX + pixels, clientY: startY, force: true })
        .trigger('pointerup', { force: true });
});
