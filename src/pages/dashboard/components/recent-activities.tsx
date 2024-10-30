import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentActivities() {
  const activities = [
    { user: 'Josephine', activity: 'Completed task: UI Update' },
    { user: 'David', activity: 'Started task: Backend Integration' },
    { user: 'Jon', activity: 'Checked in for standup' },
    { user: 'Daniel', activity: 'Submitted progress report' },
  ]

  return (
    <div className='space-y-8'>
      {activities.map((item, index) => (
        <div key={index} className='flex items-center'>
          <Avatar className='h-9 w-9'>
            <AvatarImage src={`/avatars/0${index + 1}.png`} alt='Avatar' />
            <AvatarFallback>{item.user[0]}</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>{item.user}</p>
            <p className='text-sm text-muted-foreground'>{item.activity}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
