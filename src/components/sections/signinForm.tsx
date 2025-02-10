import Input from '../common/Input'
import Button from '../common/button';
import Link from 'next/link';
const EyeIcon = '/assets/icons/eye-crossed.svg';
export default function SigninForm() {
  return (
    <div className='pt-[30px] px-5'>
      <div className='pb-[18px]'>
        <Input label="Email ID" placeholder="Enter your email" />
      </div>
      <div className='pb-3'>
        <Input label="Password" placeholder="Enter your password" icon={EyeIcon} />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-1.5'>
          <input type='checkbox' className='accent-primary' />
          <span className='text-xs text-gray800 font-medium relative top-[1px]'>
            Remember Me
          </span>
        </div>
        <a className='text-sm text-primary font-medium  cursor-pointer'>
          Forget Password?
        </a>
      </div>
      <Link href="/home">
      <div className='pt-[30px]'>
        <Button green text="Sign In" />
      </div>
      </Link>
      <div className='absolute bottom-5 w-full left-0'>
        <div className='px-5'>
          <p className='text-sm font-normal text-gray800 text-center'>
            Don’t have an account? <Link href="/signup" className='text-green font-semibold cursor-pointer'>Sing up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
