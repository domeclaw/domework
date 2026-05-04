import type { Skill } from '@accomplish_ai/agent-core';

export type FilterType = 'all' | 'active' | 'inactive' | 'official';

/** Skills that should always appear first in the list (in priority order). */
const PINNED_SKILL_IDS = ['custom-tim-tvpool-1', 'official-tim-tvpool-1'];

export function getVisibleSkills(skills: Skill[]): Skill[] {
  const visible = skills.filter((skill) => !skill.isHidden);

  // Sort: pinned skills first, then the rest by original order
  const pinned = visible.filter((s) => PINNED_SKILL_IDS.some((id) => s.id === id));
  const unpinned = visible.filter((s) => !PINNED_SKILL_IDS.some((id) => s.id === id));

  return [...pinned, ...unpinned];
}

export function getFilterCounts(visibleSkills: Skill[]) {
  return {
    all: visibleSkills.length,
    active: visibleSkills.filter((skill) => skill.isEnabled).length,
    inactive: visibleSkills.filter((skill) => !skill.isEnabled).length,
    official: visibleSkills.filter((skill) => skill.source === 'official').length,
  };
}

export function getFilteredSkills(
  visibleSkills: Skill[],
  filter: FilterType,
  searchQuery: string,
): Skill[] {
  let result = visibleSkills;

  if (filter === 'active') {
    result = result.filter((skill) => skill.isEnabled);
  } else if (filter === 'inactive') {
    result = result.filter((skill) => !skill.isEnabled);
  } else if (filter === 'official') {
    result = result.filter((skill) => skill.source === 'official');
  }

  if (searchQuery.trim()) {
    const normalizedQuery = searchQuery.toLowerCase();
    result = result.filter(
      (skill) =>
        skill.name.toLowerCase().includes(normalizedQuery) ||
        skill.description.toLowerCase().includes(normalizedQuery) ||
        skill.command.toLowerCase().includes(normalizedQuery),
    );
  }

  return result;
}
