import bundleAnalyzer from '@next/bundle-analyzer'
import createMDX from '@next/mdx'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withMDX = createMDX({})

export default withMDX(withBundleAnalyzer({
  devIndicators: false,
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',
  experimental: {
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@fortawesome/react-fontawesome@latest',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      'motion',
    ],
  },
}))
