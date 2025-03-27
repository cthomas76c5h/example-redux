import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import axios from 'axios';

import InputError from './input-error';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

import HeadingSmall from './heading-small';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';

export default function DeleteUser() {
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<{ password: string }>({
        defaultValues: { password: '' },
    });

    // A local ref for focusing the password input on error.
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (data: { password: string }) => {
        try {
            // Make a DELETE request to /api/users with axios.
            await axios.delete('/api/users', { data });
            closeModal();
        } catch (error) {
            // On error, focus the password input.
            passwordInputRef.current?.focus();
        } finally {
            reset();
        }
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    // Destructure the ref and remaining props from register for the password field.
    const { ref: passwordRef, ...passwordRest } = register('password', {
        required: 'Password is required',
    });

    return (
        <div className="space-y-6">
            <HeadingSmall
                title="Delete account"
                description="Delete your account and all its resources"
            />
            <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                <div className="relative space-y-0.5 text-red-600 dark:text-red-100">
                    <p className="font-medium">Warnung</p>
                    <p className="text-sm">
                        Bitte vorsichtig vorgehen, dies kann nicht rückgängig gemacht werden.
                    </p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Delete account</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>
                        Are you sure you want to delete your account?
                        </DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and data will also be
                            permanently deleted. Please enter your password to confirm that you want
                            your account permanently deleted.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">
                                    Passwort
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Passwort"
                                    autoComplete="current-password"
                                    {...passwordRest}
                                    ref={(e) => {
                                        passwordRef(e);
                                        passwordInputRef.current = e;
                                    }}
                                />

                                <InputError message={errors.password?.message} />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Abbrechen
                                    </Button>
                                </DialogClose>

                                <Button variant="destructive" disabled={isSubmitting} asChild>
                                    <button type="submit">Konto löschen</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
