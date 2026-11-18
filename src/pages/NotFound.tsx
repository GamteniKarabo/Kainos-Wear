import { Link } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="container-k flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
      <p className="eyebrow text-ash">Error 404</p>
      <h1 className="display mt-4 text-[clamp(4rem,18vw,12rem)] leading-none">404</h1>
      <p className="mt-4 max-w-sm text-ash">
        This page doesn&apos;t exist — but your difference does.
      </p>
      <div className="mt-9">
        <Button to="/" variant="solid">
          Back home
        </Button>
      </div>
    </div>
  )
}
