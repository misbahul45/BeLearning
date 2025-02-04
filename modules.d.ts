declare module 'midtrans-client';

    interface Window {
      snap: {
        pay: (
          token: string,
          options: {
            onSuccess: (result: MidtransResult) => void;
            onPending: (result: MidtransResult) => void;
            onError: (result: MidtransResult) => void;
            onClose: () => void;
          }
        ) => void;
      };
    }