import ComponentPageClient from './ComponentPageClient';

export function generateStaticParams() {
  return [{ component: 'button' }, { component: 'input' }, { component: 'card' }, { component: 'cta' }];
}

export default async function ComponentPage({ params }: { params: Promise<{ component: string }> }) {
  const { component } = await params;
  const componentId = component?.replace(/\/$/, '') || '';
  return <ComponentPageClient componentId={componentId} />;
}
