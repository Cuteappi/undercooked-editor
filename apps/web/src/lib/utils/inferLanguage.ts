const languageMap: Record<string, string> = {
    // Web
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'scss',
    'less': 'less',
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'json': 'json',
    'jsonc': 'jsonc',
    'svelte': 'svelte',
    'vue': 'vue',

    // Programming Languages
    'py': 'python',
    'rs': 'rust',
    'go': 'go',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'pl': 'perl',
    'sh': 'shell',
    'bash': 'shell',
    'zsh': 'shell',
    'ps1': 'powershell',

    // Markup/Config
    'md': 'markdown',
    'markdown': 'markdown',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    'ini': 'ini',
    'env': 'plaintext',
    'txt': 'plaintext',
    'csv': 'plaintext',
    'sql': 'sql',
    'graphql': 'graphql',
    'gql': 'graphql',
};

export function inferLanguage(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    return languageMap[extension] || 'plaintext';
}
