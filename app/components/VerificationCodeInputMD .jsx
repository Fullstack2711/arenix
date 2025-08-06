import { PinInput } from "@/components/base/pin-input/pin-input";

export const VerificationCodeInputMD = ({ value, onChange, disabled }) => {
    console.log('VerificationCodeInputMD props:', { value, disabled });

    return (
        <PinInput size="md" disabled={disabled}>
            <PinInput.Label>OTP Kodi</PinInput.Label>
            <PinInput.Group maxLength={4} value={value} onChange={onChange}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Slot index={3} />
            </PinInput.Group>
            <PinInput.Description>4 raqamli kodni kiriting</PinInput.Description>
        </PinInput>
    );
};