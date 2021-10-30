export interface _Profile {
  id: string;
  emails: {
    value: string; //
    verified: boolean;
  }[];
  displayName: string; // 엄문섭
  name: {
    familyName: string;
    givenName: string;
    middleName?: string; // assumption...
  };
  photos: [
    {
      value: string; // 프로필 사진인듯
    }
  ];
  provider: 'google';
}

interface Profile {
  id: string;
  email: string;
  displayName: string;
}

export type User = Profile;
