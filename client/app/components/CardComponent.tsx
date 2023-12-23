export function CardComponent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='w-full overflow-hidden rounded shadow-md'>
      <div className='px-8 py-4'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
