import Hero from '@/components/Hero';
import SigninPage from './sign-in/page';
import SignupPage from './sign-up/page';
import Game from './tic-tac-toe-board/page';

export default function Home() {
  return (
    <>
      <Hero />
      <SigninPage />
      <SignupPage />
      <Game />
    </>
  );
}
