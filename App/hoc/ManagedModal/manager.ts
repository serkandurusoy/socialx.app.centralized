export class ModalManager {
	public static toggleModalShow(visible: boolean) {
		ModalManager.allModalsHidden = visible;
		if (!visible && ModalManager.afterModalClosedHandler !== null) {
			ModalManager.afterModalClosedHandler();
			ModalManager.afterModalClosedHandler = null;
		}
	}

	public static safeRunAfterModalClosed(handler: () => void) {
		ModalManager.afterModalClosedHandler = handler;
	}

	private static allModalsHidden = false;

	private static afterModalClosedHandler: (() => void) | null = null;
}
