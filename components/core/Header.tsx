function Header() {
    return (
        <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-end px-5 pt-5">
            <div className="flex items-center gap-3">
                <div className="rounded-xl border-2 border-linear-gradient">
                    <button
                        className="flex h-11 w-37 cursor-pointer items-center justify-center rounded-[10px] px-4 text-background hover:bg-linear-gradient hover:text-foreground"
                    >
                        Log In
                    </button>
                </div>

                <div className="rounded-xl border-2 border-linear-gradient">
                    <button
                        className="flex h-11 w-37 cursor-pointer items-center bg-linear-gradient justify-center rounded-[10px] px-4 bg-foreground hover:bg-linear-gradient"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header