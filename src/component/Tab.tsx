import React from 'react'
import { Tab } from '@headlessui/react'

interface Props<T> {
  tabTitle: string[]
  tabContent: T[]
}

const Tabs: React.FC<Props<string>> = () => {
  return (
    <Tab.Group>
      <Tab.List className='flex justify-between w-max bg-yellow-200'>
        <Tab>সবগুলো</Tab>
        <Tab>পেন্ডিং</Tab>
        <Tab>রিজেক্ট</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs
