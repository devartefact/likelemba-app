import showcaseTable from '../assets/showcase-table.svg'
import Avatar, { AvatarStack } from './Avatar.jsx'

const SAMPLE_WEEK = [
  { day: 'Lun', date: 22 },
  { day: 'Mar', date: 23 },
  { day: 'Mer', date: 24 },
  { day: 'Jeu', date: 25 },
  { day: 'Ven', date: 26 },
  { day: 'Sam', date: 27 },
  { day: 'Dim', date: 28 },
]
const SAMPLE_MEMBERS = ['Bijou Kalala', 'Christian Mbuyi', 'Dorcas Ilunga', 'Jean Tshibanda']

function Dot({ className }) {
  return <span className={`absolute right-4 top-4 size-2 rounded-full ${className}`} />
}

function RoundCards() {
  return (
    <div className="absolute left-[10%] top-[4%] w-52">
      <div className="absolute left-5 top-11 h-20 w-full rounded-2xl bg-neutral/90 p-4 pt-11 text-xs text-neutral-content">
        <Dot className="top-12 bg-primary" />
        Tour 4 · 28 février
      </div>
      <div className="relative rounded-2xl bg-primary p-4 text-primary-content">
        <Dot className="bg-neutral" />
        <p className="text-sm font-medium">Tour 3 sur 6</p>
        <p className="text-xs">Bénéficiaire : Bijou</p>
      </div>
    </div>
  )
}

function MemberBubbles() {
  return (
    <div className="absolute right-[6%] top-[38%] h-28 w-28">
      <div className="absolute left-0 top-0 scale-[1.7]">
        <Avatar name={SAMPLE_MEMBERS[1]} />
      </div>
      <div className="absolute right-0 top-8 scale-[1.4]">
        <Avatar name={SAMPLE_MEMBERS[2]} />
      </div>
      <div className="absolute bottom-0 left-8 scale-[1.1]">
        <Avatar name={SAMPLE_MEMBERS[3]} />
      </div>
    </div>
  )
}

function WeekCalendar() {
  return (
    <div className="absolute left-[18%] right-[8%] top-[58%] rounded-t-2xl bg-neutral/45 p-4 text-neutral-content backdrop-blur-sm">
      <div className="grid grid-cols-7 text-center">
        {SAMPLE_WEEK.map(({ day, date }) => (
          <div key={day}>
            <p className="text-xs">{day}</p>
            <p className="text-xl font-light">{date}</p>
          </div>
        ))}
      </div>
      <div className="calendar-hatch ml-auto mt-3 h-12 w-2/5" />
    </div>
  )
}

function ContributionCard() {
  return (
    <div className="absolute bottom-[7%] left-[10%] w-56 rounded-2xl bg-base-100 p-4">
      <Dot className="bg-primary" />
      <p className="text-sm font-medium">Cotisation du mois</p>
      <p className="text-xs text-soft">150 000 CDF</p>
      <div className="mt-4">
        <AvatarStack names={SAMPLE_MEMBERS} />
      </div>
    </div>
  )
}

function NotchMark() {
  return (
    <span className="absolute right-1.5 top-0.5 flex size-11 items-center justify-center rounded-full bg-base-100/90">
      <span className="size-4 rounded-full border-2 border-base-content" />
    </span>
  )
}

// A decorative preview of the product: its sample figures are not real data, so screen readers skip it.
function AuthShowcase() {
  return (
    <div className="relative hidden select-none md:block" aria-hidden="true">
      <div className="showcase-frame absolute inset-0 overflow-hidden">
        <img src={showcaseTable} alt="" className="size-full object-cover" />
        <RoundCards />
        <MemberBubbles />
        <WeekCalendar />
        <ContributionCard />
      </div>
      <NotchMark />
    </div>
  )
}

export default AuthShowcase
