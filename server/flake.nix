{
  description = "Java 25, Maven 3.9 and Liquibase (Community) Environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      utils,
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
          overlays = [
            (final: prev: {
              jdk = prev.jdk25;
              maven = prev.maven.override { jdk_headless = prev.jdk25; };
              lombok = prev.lombok.override { jdk = prev.jdk25; };
            })
          ];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            gcc
            ncurses
            patchelf
            zlib
            tree
            jdk25
            maven
            gradle
            liquibase
            postgresql_jdbc
            jdt-language-server
            lombok
          ];

          shellHook = ''
            export JAVA_HOME=${pkgs.jdk25.home}
            export PATH="${pkgs.jdk25}/bin:$PATH"
            export JDTLS_HOME=${pkgs.jdt-language-server}/share/java/jdtls

            mkdir -p ~/.local/share/nvim/mason/packages/jdtls
            rm -rf ~/.local/share/nvim/mason/packages/jdtls/plugins
            rm -f ~/.local/share/nvim/mason/packages/jdtls/lombok.jar

            ln -sf ${pkgs.jdt-language-server}/share/java/jdtls/plugins ~/.local/share/nvim/mason/packages/jdtls/plugins
            ln -sf ${pkgs.lombok}/share/java/lombok.jar ~/.local/share/nvim/mason/packages/jdtls/lombok.jar

            if [ ! -d ~/.local/share/nvim/mason/packages/jdtls/config_linux ]; then
              cp -r ${pkgs.jdt-language-server}/share/java/jdtls/config_linux ~/.local/share/nvim/mason/packages/jdtls/config_linux
              chmod -R u+w ~/.local/share/nvim/mason/packages/jdtls/config_linux
            fi

            echo "------------------------------------------"
            echo "🚀 Java 25, Maven 3.9 & Liquibase Shell Active"
            echo "JDK Path: $JAVA_HOME"
            java -version
            mvn -version
            echo "Liquibase Version:"
            liquibase --version
            echo "------------------------------------------"
          '';
        };

        checks = {
          build = pkgs.stdenv.mkDerivation {
            name = "java-project-test";
            src = ./.;
            buildInputs = [
              pkgs.jdk25
              pkgs.maven
            ];
            buildPhase = "mvn test";
            installPhase = "touch $out";
          };
        };
      }
    );
}
