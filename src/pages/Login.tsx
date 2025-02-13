import { useForm, SubmitHandler } from "react-hook-form";
import { CaretRight } from '@phosphor-icons/react'
import Button from "../components/Button";
import { useNavigation } from "../contexts/NavigationContext"

type Inputs = {
        email: string,
        password: string,
};


const Login = () => {
        const { setCurrentScreen } = useNavigation();
        const { register, handleSubmit } = useForm<Inputs>();
        
        const onSubmit: SubmitHandler<Inputs> = data => {
                console.log(data);
                //TODO: Implement login logic
                //TODO: Implement errors handling
                setCurrentScreen('promos');
        };
        
        return (
        <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex flex-col items-center justify-center w-full h-full gap-y-5 text-zinc-100">
                        <h1 className="text-2xl md:text-3xl font-bold text-left w-sm md:w-xl">Welcome to GetYourPromo</h1>
                        <div className="bg-zinc-800 w-sm md:w-xl rounded-xl flex flex-col items-center justify-center p-8">
                                <img src = 'src/assets/img/gp-logo.svg' alt = 'GetYourPromo App Logo' className = 'w-30'/>
                                <form className="flex flex-col gap-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                                        <span className="text-zinc-200">Email</span>
                                        <input 
                                                type="email" 
                                                className="w-full py-2 px-4 bg-zinc-700 rounded-lg text-zinc-100 "
                                                placeholder="example@email.com"
                                                {...register("email", {required: false})} //TODO: Turn Required
                                        />
                                        <span className="text-zinc-200">Password</span>
                                        <input 
                                                type="password" 
                                                className="w-full py-2 px-4 bg-zinc-700 rounded-lg text-zinc-100"
                                                placeholder="********"
                                                {...register("password", {required: false})} //TODO: Turn Required
                                        />
                                        
                                        <div className="mt-4 flex justify-end w-full">
                                                <Button 
                                                        type="submit"
                                                        variant="primary"
                                                >
                                                        <CaretRight className="font-bold"/>
                                                        <span>Next</span>
                                                </Button>
                                        </div>
                                </form>
                        </div>
                </div>
        </div>
        );
}

export default Login;