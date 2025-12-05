import ContentSections, { type ContentSectionData } from '@/components/tv/ContentSections';
import OverlayContentSections from '@/components/tv/OverlayContentSections';
import StackedContentSections from '@/components/tv/StackedContentSections';

export type NormalizedSectionGroup = {
  kind: 'content' | 'stacked' | 'overlay';
  sections: ContentSectionData[];
  textFirst?: boolean;
};

type SectionGroupsRendererProps = {
  sectionGroups: NormalizedSectionGroup[];
  lang: 'fa' | 'en';
};

const SectionGroupsRenderer = ({ sectionGroups, lang }: SectionGroupsRendererProps) => (
  <>
    {sectionGroups.map((group, idx) => {
      if (group.kind === 'content') {
        return (
          <ContentSections key={`content-${idx}`} sections={group.sections} isRTL={lang === 'fa'} />
        );
      }
      if (group.kind === 'overlay') {
        return (
          <OverlayContentSections
            key={`overlay-${idx}`}
            sections={group.sections}
            isRTL={lang === 'fa'}
          />
        );
      }
      return (
        <StackedContentSections
          key={`stacked-${idx}`}
          sections={group.sections}
          isRTL={lang === 'fa'}
          textFirst={group.textFirst}
        />
      );
    })}
  </>
);

export default SectionGroupsRenderer;
