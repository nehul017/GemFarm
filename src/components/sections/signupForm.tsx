import Input from '../common/Input'
import Button from '../common/button';
import Link from 'next/link';
const EyeIcon = '/assets/icons/eye-crossed.svg';
export default function SignupForm() {
    return (
        <div>
            <div className='pt-[30px] px-5'>
                <div className='pb-[18px]'>
                    <Input label="Name" placeholder="Enter your name" />
                </div>
                <div className='pb-[18px]'>
                    <Input label="Email ID" placeholder="Enter your email" />
                </div>
                <Input label="Password" placeholder="Enter your password" icon={EyeIcon} />
                <Link href="/watch-list">
                <div className='pt-[30px]'>
                    <Button green text="Sign In" />
                </div>
                </Link>
                <div className='absolute bottom-5 w-full left-0'>
                    <div className='px-5'>
                    <p className='text-sm font-normal text-gray800 text-center'>
                    Already have an account? <Link href="/signin" className='text-green font-semibold cursor-pointer'>Sing in</Link>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
