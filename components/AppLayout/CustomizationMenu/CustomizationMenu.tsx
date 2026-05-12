'use client'

import { ComputerSettingsIcon, Moon02Icon, Settings01Icon, Sun03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ActionIcon, Button, Center, Divider, Group, Modal, NumberInput, Radio, SegmentedControl, Stack, Text, Title, useMantineColorScheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import { fontMapping } from '@/fonts'
import useDynamicTheme from '@/utilities/useDynamicTheme'

import classes from '@/common.module.css'
import { IconX } from '@tabler/icons-react'

export default function CustomizationMenu() {
  const [opened, { open, close }] = useDisclosure(false)
  const [previewFontFamily, setPreviewFontFamily] = useState('lexend')
  const selectedFont = fontMapping[previewFontFamily as keyof(typeof fontMapping)].font.style.fontFamily
  const [previewLineSpacing, setPreviewLineSpacing] = useState<string | number>(1.5)
  const [previewLetterSpacing, setPreviewLetterSpacing] = useState<string | number>(0.12)
  const [previewWordSpacing, setPreviewWordSpacing] = useState<string | number>(0.16)
  const [previewParagraphSpacing, setPreviewParagraphSpacing] = useState<string | number>(2)
  
  const { fontFamily, setFontFamily, lineSpacing, setLineSpacing, letterSpacing,
    setLetterSpacing, wordSpacing, setWordSpacing, paragraphSpacing, setParagraphSpacing } = useDynamicTheme()
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  
  const openMenu = () => {
    setPreviewFontFamily(fontFamily)
    setPreviewLineSpacing(lineSpacing)
    setPreviewLetterSpacing(letterSpacing)
    setPreviewWordSpacing(wordSpacing)
    setPreviewParagraphSpacing(paragraphSpacing)
    open()
  }
  
  const saveSettings = () => {
    setFontFamily(previewFontFamily)
    setLineSpacing(typeof previewLineSpacing === 'number' ? previewLineSpacing : 1.5)
    setLetterSpacing(typeof previewLetterSpacing === 'number' ? previewLetterSpacing : 0.12)
    setWordSpacing(typeof previewWordSpacing === 'number' ? previewWordSpacing : 0.16)
    setParagraphSpacing(typeof previewParagraphSpacing === 'number' ? previewParagraphSpacing : 2)
    close()
  }
  
  return <>
    <ActionIcon aria-label="Open website settings" mx="sm" color="blue" variant="outline" size="lg" onClick={openMenu}>
      <HugeiconsIcon icon={Settings01Icon} aria-hidden />
    </ActionIcon>
    <Modal
      opened={opened}
      onClose={close}
      title={<strong>Website Settings</strong>}
      closeButtonProps={{ autoFocus: true, 'aria-label': 'Close settings', icon: <IconX aria-hidden /> }}
      size="lg"
    >
      <Text id="color-theme-label" fw="bold" mb="xs" className={classes['segmented-control-label']}>Color Theme</Text>
      <SegmentedControl
        aria-labelledby="color-theme-label"
        withItemsBorders={false}
        mb="md"
        value={colorScheme}
        onChange={setColorScheme}
        data={[
          {
            value: 'auto',
            label: (
              <Center style={{ gap: 10 }} fz="md">
                <HugeiconsIcon icon={ComputerSettingsIcon} aria-hidden />
                <span>Auto</span>
              </Center>
            ),
          },
          {
            value: 'dark',
            label: (
              <Center style={{ gap: 10 }} fz="md">
                <HugeiconsIcon icon={Moon02Icon} aria-hidden />
                <span>Dark</span>
              </Center>
            ),
          },
          {
            value: 'light',
            label: (
              <Center style={{ gap: 10 }} fz="md">
                <HugeiconsIcon icon={Sun03Icon} aria-hidden />
                <span>Light</span>
              </Center>
            ),
          },
        ]}
      />
      
      <Divider mb="md" />
      
      <Radio.Group
        label={<Text fw="bold">Font Family</Text>}
        mb="md"
        value={previewFontFamily}
        onChange={setPreviewFontFamily}
      >
        <Stack mt="xs">
          {Object.keys(fontMapping).map((fontFamily) => {
            const mappedFont = fontMapping[fontFamily as keyof(typeof fontMapping)]
            
            return <Radio
              key={fontFamily}
              value={fontFamily}
              label={mappedFont.name}
              ff={mappedFont.font.style.fontFamily}
            />
          })}
        </Stack>
      </Radio.Group>
      
      <NumberInput
        label="Line Spacing"
        mb="md"
        allowNegative={false}
        min={1}
        max={2}
        step={0.1}
        value={previewLineSpacing}
        onChange={setPreviewLineSpacing}
      />
      <NumberInput
        label="Letter Spacing"
        mb="md"
        allowNegative={false}
        min={0}
        max={0.25}
        step={0.01}
        value={previewLetterSpacing}
        onChange={setPreviewLetterSpacing}
      />
      <NumberInput
        label="Word Spacing"
        mb="md"
        allowNegative={false}
        min={0}
        max={0.25}
        step={0.01}
        value={previewWordSpacing}
        onChange={setPreviewWordSpacing}
      />
      <NumberInput
        label="Paragraph Spacing"
        mb="md"
        allowNegative={false}
        min={1}
        max={3}
        step={0.5}
        value={previewParagraphSpacing}
        onChange={setPreviewParagraphSpacing}
      />
      
      <Title order={3}>Preview Text</Title>
      <Text
        style={{
          fontFamily: selectedFont,
          lineHeight: previewLineSpacing,
          letterSpacing: `${previewLetterSpacing}em`,
          wordSpacing: `${previewWordSpacing}em`,
        }}
        mb={`${previewParagraphSpacing}em`}
      >
        You may have heard about magical wizards that sit behind computer screens all day and make computers do whatever they want. Some create elaborate video games, others complicated websites, and still others that make robots move, speak, and beat people at chess. But what is programming really? At a very basic level, it's just giving a computer a list of instructions to follow one by one.
      </Text>
      <Text
        style={{
          fontFamily: selectedFont,
          lineHeight: previewLineSpacing,
          letterSpacing: `${previewLetterSpacing}em`,
          wordSpacing: `${previewWordSpacing}em`,
        }}
      >
        Imagine it somewhat like baking cookies: First, you need to know what ingredients the cookie recipe asks for. In other words, what do you want this computer program to be able to do? Chocolate chip cookies and peanut butter cookies are both cookies, but they can taste very different. Same with computer programs. One may be your favorite game this year, and another may be the app you use to remind yourself to take out the trash. These programs will have different parts to them, like 3D models for characters, or a database to store a list of reminders.
      </Text>
      
      <Group justify="space-between" mt="md">
        <Button variant="outline" color="dark" onClick={close}>
          Cancel
        </Button>
        <Button onClick={saveSettings}>
          Save
        </Button>
      </Group>
    </Modal>
  </>
}
